package com.healthinal.backend.checkupapp.repository

import com.healthinal.backend.checkupapp.model.HealthMetric
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface HealthMetricRepository : JpaRepository<HealthMetric, String>
