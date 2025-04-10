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

    var steps: String? = null,
    var stepGoal: String? = null,

    var water: String? = null,
    var waterGoal: String? = null,

    var sleep: String? = null,
    var sleepGoal: String? = null,

    var weight: String? = null,
    var weightGoal: String? = null,

    val date: LocalDate? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    val user: User? = null
)
