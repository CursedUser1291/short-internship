package com.healthinal.backend.checkupapp.controllers

import com.healthinal.backend.checkupapp.enums.Subjects
import com.healthinal.backend.checkupapp.model.HealthMetric
import com.healthinal.backend.checkupapp.model.SafeUserDTO
import com.healthinal.backend.checkupapp.model.UpdateMetricDTO
import com.healthinal.backend.checkupapp.repository.HealthMetricRepository
import com.healthinal.backend.checkupapp.repository.UserRepository
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
    fun updateHealthmetric(@RequestBody payload: UpdateMetricDTO): ResponseEntity<String> {
        val user = userRepository.findById(payload.userId)
            .orElseThrow { IllegalArgumentException("User not found") }

        val existingMetric = healthMetricRepository.findByUserAndDate(user, payload.date)

        val subject = try {
            Subjects.valueOf(payload.title.uppercase())
        } catch (e: IllegalArgumentException) {
            throw IllegalArgumentException("Invalid title: ${payload.title}")
        }

        if (existingMetric != null) {
            when (subject) {
                Subjects.STEPS -> {
                    existingMetric.steps = updateMetricField(payload.mainValue, isInteger = true)?.toInt()
                    existingMetric.stepGoal = updateMetricField(payload.goal, isInteger = true)?.toInt()
                }
                Subjects.WATER -> {
                    existingMetric.water = updateMetricField(payload.mainValue)
                    existingMetric.waterGoal = updateMetricField(payload.goal)
                }
                Subjects.SLEEP -> {
                    existingMetric.sleep = updateMetricField(payload.mainValue)
                    existingMetric.sleepGoal = updateMetricField(payload.goal)
                }
                Subjects.WEIGHT -> {
                    existingMetric.weight = updateMetricField(payload.mainValue)
                    existingMetric.weightGoal = updateMetricField(payload.goal)
                }
                else -> throw IllegalArgumentException("Invalid title: ${payload.title}")
            }

            if (existingMetric.steps == null &&
                existingMetric.water == null &&
                existingMetric.sleep == null &&
                existingMetric.weight == null
                ) {
                healthMetricRepository.delete(existingMetric)
            } else {
                healthMetricRepository.save(existingMetric)
            }
        } else {
            val newMetric = HealthMetric(
                steps = if (subject == Subjects.STEPS) payload.mainValue?.toInt() else null,
                stepGoal = if (subject == Subjects.STEPS) payload.goal?.toInt() else null,
                water = if (subject == Subjects.WATER) payload.mainValue else null,
                waterGoal = if (subject == Subjects.WATER) payload.goal else null,
                sleep = if (subject == Subjects.SLEEP) payload.mainValue else null,
                sleepGoal = if (subject == Subjects.SLEEP) payload.goal else null,
                weight = if (subject == Subjects.WEIGHT) payload.mainValue else null,
                weightGoal = if (subject == Subjects.WEIGHT) payload.goal else null,
                date = payload.date,
                user = user
            )
            healthMetricRepository.save(newMetric)
        }

        return ResponseEntity.ok("Health metric updated successfully")
    }

    private fun updateMetricField(newValue: Double?, isInteger: Boolean = false): Double? {
        return if (newValue != null) {
            if (isInteger) {
                newValue.toInt().toDouble()
            } else {
                newValue
            }
        } else {
            null
        }
    }

    @GetMapping("/{userId}")
    fun getUserHealthMetrics(@PathVariable userId: String): ResponseEntity<Map<String, SafeUserDTO>> {
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
