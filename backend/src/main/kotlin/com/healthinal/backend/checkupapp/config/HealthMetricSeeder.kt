package com.healthinal.backend.checkupapp.config

import com.healthinal.backend.checkupapp.model.HealthMetric
import com.healthinal.backend.checkupapp.repository.HealthMetricRepository
import com.healthinal.backend.checkupapp.repository.UserRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import java.time.LocalDate

@Component
class HealthMetricSeeder(
    private val healthMetricRepository: HealthMetricRepository,
    private val userRepository: UserRepository
) : CommandLineRunner {

    override fun run(vararg args: String?) {
        if (healthMetricRepository.count() == 0L) {
            val today = LocalDate.now()

            val metrics = listOf(
                HealthMetric(steps = "7216", stepGoal = "9000", water = "1.5", waterGoal = "2.0",
                    sleep = "7.5", sleepGoal = "8.1", weight = "61", weightGoal = "60.0", date = today.minusDays(4), user = userRepository.findByUsername("user1")),

                HealthMetric(steps = "8123", stepGoal = "9000", water = "2.0", waterGoal = "2.0",
                    sleep = "6.5", sleepGoal = "8.0", weight = "61", weightGoal = "60.0", date = today.minusDays(1), user = userRepository.findByUsername("user2")),

                HealthMetric(steps = "3450", stepGoal = "9000", water = "1.0", waterGoal = "2.0",
                    sleep = "8.0", sleepGoal = "8.0", weight = "60", weightGoal = "60.0", date = today,user = userRepository.findByUsername("user2"))
            )

            healthMetricRepository.saveAll(metrics)
        }
    }
}
