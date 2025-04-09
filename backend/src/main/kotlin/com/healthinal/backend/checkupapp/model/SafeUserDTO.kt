package com.healthinal.backend.checkupapp.model

data class SafeUserDTO (
    val id: String,
    val username: String,
    val healthMetrics: List<HealthMetric>
)
