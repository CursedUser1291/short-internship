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

    var steps: Int? = null,
    var stepGoal: Int? = null,

    var water: Double? = null,
    var waterGoal: Double? = null,

    var sleep: Double? = null,
    var sleepGoal: Double? = null,

    var weight: Double? = null,
    var weightGoal: Double? = null,

    val date: LocalDate? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    val user: User? = null
)
