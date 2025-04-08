package com.healthinal.backend.checkupapp.config

import com.healthinal.backend.checkupapp.model.HealthMetric
import com.healthinal.backend.checkupapp.repository.HealthMetricRepository
import java.sql.DriverManager
import java.sql.Statement
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import java.time.LocalDate

@Component
class HealthMetricSeeder(
    private val healthMetricRepository: HealthMetricRepository
) : CommandLineRunner {

    override fun run(vararg args: String?) {
        if (healthMetricRepository.count() == 0L) {
            val today = LocalDate.now()

            val metrics = listOf(
                HealthMetric(steps = "7216", stepGoal = "9000", water = "1.5", waterGoal = "2.0",
                    sleep = "7.5", sleepGoal = "8.0", weight = "61", weightGoal = "60", date = today.minusDays(2)),

                HealthMetric(steps = "8123", stepGoal = "9000", water = "2.0", waterGoal = "2.0",
                    sleep = "6.5", sleepGoal = "8.0", weight = "61", weightGoal = "60", date = today.minusDays(1)),

                HealthMetric(steps = "3450", stepGoal = "9000", water = "1.0", waterGoal = "2.0",
                    sleep = "8.0", sleepGoal = "8.0", weight = "60", weightGoal = "60", date = today)
            )

            healthMetricRepository.saveAll(metrics)
            println("Seeded ${metrics.size} health metrics.")
        }
    }
}
