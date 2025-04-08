package com.healthinal.backend.checkupapp.controllers

import com.healthinal.backend.checkupapp.model.HealthMetric
import com.healthinal.backend.checkupapp.repository.HealthMetricRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/health-metrics")
class BackendController (
    private val healthMetricRepository: HealthMetricRepository
) {

    @GetMapping
    fun getAllHealthMetrics() : List<HealthMetric>{
        return healthMetricRepository.findAll()
    }

    @GetMapping("/test")
    fun testEndpoint() = "Test is working"
}
