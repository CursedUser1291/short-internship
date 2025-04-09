package com.healthinal.backend.checkupapp.model

import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.Id
import jakarta.persistence.OneToMany
import jakarta.persistence.Table
import java.util.*

@Entity
@Table(name = "users")
data class User(
    @Id
    val id: String = UUID.randomUUID().toString(),
    val username: String,
    val password: String,

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    val healthMetrics: List<HealthMetric> = mutableListOf()
) {
    constructor() : this("","","") {

    }
}
