#pragma once

#include <cuda_runtime.h>
#include <stdint.h>
#include <unordered_map>
#include <memory>
#include <vector>
#include <string>

// 6. Persistent Session State on GPU
struct PackedSessionDeviceState {
    int32_t position;
    float temperature;
    float repetition_penalty;
    int32_t top_k;
    float top_p;

    void* logits;
    void* seen_tokens;
    void* rng_state;
    void* sampled_dest;
    void* position_dest;

    uint32_t page_count;
    uint32_t* page_table;
};

enum class GemmBackend {
    Cublas,
    CublasLt,
    Cutlass,
    Custom
};

// 10. Performance Preset and Options
struct ModelOptions {
    bool fused_residuals = false;
    bool fast_attention = false;
    bool fused_projections = false;
    bool fused_sampling = false;
    bool cuda_graph = false;
    GemmBackend gemm_backend = GemmBackend::Cublas;
    bool lt_autotune = false;

    static ModelOptions performance() {
        ModelOptions o;
        o.fused_residuals = true;
        o.fast_attention = true;
        o.fused_projections = true;
        o.fused_sampling = true;
        o.cuda_graph = true;
        o.gemm_backend = GemmBackend::CublasLt;
        o.lt_autotune = true;
        return o;
    }
};

// Execution plan cache key type
struct PlanCacheKey {
    int32_t batch_size;
    int32_t seq_len;
    int32_t num_active_experts;
    bool training;

    bool operator==(const PlanCacheKey& o) const {
        return batch_size == o.batch_size &&
               seq_len == o.seq_len &&
               num_active_experts == o.num_active_experts &&
               training == o.training;
    }
};

struct PlanCacheKeyHash {
    size_t operator()(const PlanCacheKey& k) const {
        return (std::hash<int32_t>()(k.batch_size)) ^
               (std::hash<int32_t>()(k.seq_len) << 1) ^
               (std::hash<int32_t>()(k.num_active_experts) << 2) ^
               (std::hash<bool>()(k.training) << 3);
    }
};

class ExecutionPlan {
public:
    std::string name;
    static std::shared_ptr<ExecutionPlan> compile(const PlanCacheKey& key) {
        // Simulated expensive compilation
        auto plan = std::make_shared<ExecutionPlan>();
        plan->name = "plan_b" + std::to_string(key.batch_size) + "_s" + std::to_string(key.seq_len);
        return plan;
    }
};

class ExecutionPlanCache {
private:
    std::unordered_map<PlanCacheKey, std::shared_ptr<ExecutionPlan>, PlanCacheKeyHash> cache_;
public:
    std::shared_ptr<ExecutionPlan> get_or_compile(int32_t batch_size, int32_t seq_len, int32_t num_experts, bool training) {
        PlanCacheKey key{batch_size, seq_len, num_experts, training};
        auto it = cache_.find(key);
        if (it != cache_.end()) {
            return it->second;
        }
        auto plan = ExecutionPlan::compile(key);
        cache_[key] = plan;
        return plan;
    }
};
