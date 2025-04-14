package com.healthinal.backend.checkupapp.controllers

import com.healthinal.backend.checkupapp.model.HealthMetric
import com.healthinal.backend.checkupapp.model.SafeUserDTO
import com.healthinal.backend.checkupapp.repository.HealthMetricRepository
import com.healthinal.backend.checkupapp.repository.UserRepository
import java.time.LocalDate
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/health-metrics")
class MetricController (
    private val healthMetricRepository: HealthMetricRepository,
    private val userRepository: UserRepository
) {
    @PatchMapping
    fun updateHealthmetric(@RequestBody payload: Map<String, Any>): ResponseEntity<String> {
        val userId = payload["userId"] as? String ?: throw IllegalArgumentException("User ID is required")
        val date = LocalDate.parse(payload["date"] as? String ?: throw IllegalArgumentException("Date is required"))
        val title = payload["title"] as? String ?: throw IllegalArgumentException("Title is required")
        val mainValue = (payload["mainValue"] as? Number)?.toDouble()
        val goal = (payload["goal"] as? Number)?.toDouble()

        val user = userRepository.findById(userId)
            .orElseThrow { IllegalArgumentException("User not found") }

        val existingMetric = healthMetricRepository.findByUserAndDate(user, date)

        if (existingMetric != null) {
            when (title.lowercase()) {
                "steps" -> {
                    existingMetric.steps = updateMetricField(mainValue, isInteger = true)
                    existingMetric.stepGoal = updateMetricField(goal, isInteger = true)
                }
                "water" -> {
                    existingMetric.water = updateMetricField(mainValue)
                    existingMetric.waterGoal = updateMetricField(goal)
                }
                "sleep" -> {
                    existingMetric.sleep = updateMetricField(mainValue)
                    existingMetric.sleepGoal = updateMetricField(goal)
                }
                "weight" -> {
                    existingMetric.weight = updateMetricField(mainValue)
                    existingMetric.weightGoal = updateMetricField(goal)
                }
                else -> throw IllegalArgumentException("Invalid title: $title")
            }
            healthMetricRepository.save(existingMetric)
        } else {
            val newMetric = HealthMetric(
                steps = if (title.lowercase() == "steps") mainValue?.toString() else null,
                stepGoal = if (title.lowercase() == "steps") goal?.toString() else null,
                water = if (title.lowercase() == "water") mainValue?.toString() else null,
                waterGoal = if (title.lowercase() == "water") goal?.toString() else null,
                sleep = if (title.lowercase() == "sleep") mainValue?.toString() else null,
                sleepGoal = if (title.lowercase() == "sleep") goal?.toString() else null,
                weight = if (title.lowercase() == "weight") mainValue?.toString() else null,
                weightGoal = if (title.lowercase() == "weight") goal?.toString() else null,
                date = date,
                user = user
            )
            healthMetricRepository.save(newMetric)
        }

        return ResponseEntity.ok("Health metric updated successfully")
    }

    private fun updateMetricField(newValue: Double?, isInteger: Boolean = false): String? {
        return if (newValue != null) {
            if (isInteger) {
                newValue.toInt().toString()
            } else {
                String.format("%.1f", newValue)
            }
        } else {
            null
        }
    }

    @GetMapping("/{userId}")
    fun getUserHealthMetrics(@PathVariable userId: String): ResponseEntity<Any> {
        val user = userRepository.findById(userId)
            .orElseThrow { IllegalArgumentException("User not found") }

        val metrics = healthMetricRepository.findByUserId(user.id)
        val safeUser = SafeUserDTO(
            id = user.id,
            username = user.username,
            healthMetrics = metrics
        )
        return ResponseEntity.ok(mapOf("user" to safeUser))
    }
}
