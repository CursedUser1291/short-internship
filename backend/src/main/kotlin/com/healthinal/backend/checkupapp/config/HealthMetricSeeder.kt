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
                HealthMetric(
                    steps = 7216,
                    stepGoal = 9000,
                    water = 1.5,
                    waterGoal = 2.0,
                    sleep = 7.5,
                    sleepGoal = 8.1,
                    weight = 61.0,
                    weightGoal = 60.0,
                    date = today.minusDays(4),
                    user = userRepository.findByUsername("user1")
                ),
                HealthMetric(
                    steps = 8123,
                    stepGoal = 9000,
                    water = 2.0,
                    waterGoal = 2.0,
                    sleep = 6.5,
                    sleepGoal = 8.0,
                    weight = 61.0,
                    weightGoal = 60.0,
                    date = today.minusDays(1),
                    user = userRepository.findByUsername("user2")
                ),
                HealthMetric(
                    steps = 3450,
                    stepGoal = 9000,
                    water = 1.0,
                    waterGoal = 2.0,
                    sleep = 8.0,
                    sleepGoal = 8.0,
                    weight = 60.0,
                    weightGoal = 60.0,
                    date = today,
                    user = userRepository.findByUsername("user2")
                ),
                HealthMetric(
                    steps = 5000,
                    stepGoal = 9000,
                    water = 1.8,
                    waterGoal = 2.0,
                    sleep = 6.0,
                    sleepGoal = 8.0,
                    weight = 62.0,
                    weightGoal = 60.0,
                    date = today.minusDays(3),
                    user = userRepository.findByUsername("user1")
                ),
                HealthMetric(
                    steps = 10000,
                    stepGoal = 9000,
                    water = 2.5,
                    waterGoal = 2.0,
                    sleep = 7.0,
                    sleepGoal = 8.0,
                    weight = 59.0,
                    weightGoal = 60.0,
                    date = today.minusDays(2),
                    user = userRepository.findByUsername("user2")
                ),
                HealthMetric(
                    steps = 2000,
                    stepGoal = 9000,
                    water = 0.5,
                    waterGoal = 2.0,
                    sleep = 5.0,
                    sleepGoal = 8.0,
                    weight = 63.0,
                    weightGoal = 60.0,
                    date = today.minusDays(5),
                    user = userRepository.findByUsername("user1")
                ),
                HealthMetric(
                    steps = 8500,
                    stepGoal = 9000,
                    water = 2.0,
                    waterGoal = 2.0,
                    sleep = 8.0,
                    sleepGoal = 8.0,
                    weight = 60.5,
                    weightGoal = 60.0,
                    date = today.minusDays(6),
                    user = userRepository.findByUsername("user2")
                ),
                HealthMetric(
                    steps = 4000,
                    stepGoal = 9000,
                    water = 1.2,
                    waterGoal = 2.0,
                    sleep = 6.5,
                    sleepGoal = 8.0,
                    weight = 62.5,
                    weightGoal = 60.0,
                    date = today.minusDays(7),
                    user = userRepository.findByUsername("user1")
                ),
                HealthMetric(
                    steps = 10000,
                    stepGoal = 10000,
                    water = 2.5,
                    waterGoal = 3.0,
                    sleep = 8.0,
                    sleepGoal = 8.0,
                    weight = 69.0,
                    weightGoal = 68.0,
                    date = today.minusWeeks(2),
                    user = userRepository.findByUsername("user2")
                ),
                HealthMetric(
                    steps = 4000,
                    stepGoal = 10000,
                    water = 1.0,
                    waterGoal = 3.0,
                    sleep = 5.0,
                    sleepGoal = 8.0,
                    weight = 72.0,
                    weightGoal = 68.0,
                    date = today.minusMonths(2),
                    user = userRepository.findByUsername("user2")
                ),
            )

            healthMetricRepository.saveAll(metrics)
        }
    }
}
