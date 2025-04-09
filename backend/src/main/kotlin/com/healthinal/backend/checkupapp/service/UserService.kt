package com.healthinal.backend.checkupapp.service

import com.healthinal.backend.checkupapp.model.HealthMetric
import com.healthinal.backend.checkupapp.model.User
import com.healthinal.backend.checkupapp.repository.HealthMetricRepository
import com.healthinal.backend.checkupapp.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class UserService(
    @Autowired private val userRepository: UserRepository,
    @Autowired private val healthMetricRepository: HealthMetricRepository,
) {

    fun login(username: String, password: String): User? {
        val user = userRepository.findByUsername(username)
        return if (user != null && user.password == password) {
            user
        } else {
            null
        }
    }

    fun getUserHealthMetrics(userId: String): List<HealthMetric> {
        return healthMetricRepository.findByUserId(userId)
    }
}
