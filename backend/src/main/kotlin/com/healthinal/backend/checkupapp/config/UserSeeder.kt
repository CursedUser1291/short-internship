package com.healthinal.backend.checkupapp.config

import com.healthinal.backend.checkupapp.model.User
import com.healthinal.backend.checkupapp.repository.UserRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.core.annotation.Order
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component

@Component
@Order(1)
class UserSeeder(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder
) : CommandLineRunner {
    override fun run(vararg args: String?) {
        if (userRepository.count() == 0L) {
            val users = listOf(
                User(username = "user1", password = passwordEncoder.encode("pw1")),
                User(username = "user2", password = passwordEncoder.encode("pw2")),
                User(username = "user3", password = passwordEncoder.encode("pw3"))
            )

            userRepository.saveAll(users)
        }
    }
}
