package com.healthinal.backend.checkupapp.config

import com.healthinal.backend.checkupapp.model.User
import com.healthinal.backend.checkupapp.repository.UserRepository
import com.healthinal.backend.checkupapp.util.PasswordHasher
import org.springframework.boot.CommandLineRunner
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
@Component
@Order(1)
class UserSeeder(
    private val userRepository: UserRepository,
) : CommandLineRunner {
    override fun run(vararg args: String?) {
        if (userRepository.count() == 0L) {
            val users = listOf(
                User(username = "user1", password = PasswordHasher.hash("pw1")),
                User(username = "user2", password = PasswordHasher.hash("pw2")),
                User(username = "user3", password = PasswordHasher.hash("pw3"))
            )

            userRepository.saveAll(users)
        }
    }
}
