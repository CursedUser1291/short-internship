package com.healthinal.backend.checkupapp.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import java.time.LocalDate
import java.util.*

@Entity
@Table(name = "health_metrics")
data class HealthMetric(
    @Id
    val id: String = UUID.randomUUID().toString(),

    val steps: String? = null,
    val stepGoal: String? = null,

    val water: String? = null,
    val waterGoal: String? = null,

    val sleep: String? = null,
    val sleepGoal: String? = null,

    val weight: String? = null,
    val weightGoal: String? = null,

    val date: LocalDate? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    val user: User? = null
)
