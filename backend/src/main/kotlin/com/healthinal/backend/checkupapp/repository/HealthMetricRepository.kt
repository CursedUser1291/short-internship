package com.healthinal.backend.checkupapp.repository

import com.healthinal.backend.checkupapp.model.HealthMetric
import com.healthinal.backend.checkupapp.model.User
import java.time.LocalDate
import org.springframework.data.geo.Metric
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository


@Repository
interface HealthMetricRepository : JpaRepository<HealthMetric, String> {
    fun findByUserId(userId: String): List<HealthMetric>

    fun findByUserAndDate(user: User, date: LocalDate?): HealthMetric?
}
