package com.healthinal.backend.checkupapp.controllers

import com.healthinal.backend.checkupapp.model.HealthMetric
import com.healthinal.backend.checkupapp.model.SafeUserDTO
import com.healthinal.backend.checkupapp.model.User
import com.healthinal.backend.checkupapp.repository.UserRepository
import com.healthinal.backend.checkupapp.service.UserService
import com.healthinal.backend.checkupapp.util.PasswordHasher
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class UserController(
    @Autowired private val userService: UserService,
    private val userRepository: UserRepository
) {

    @PostMapping("/login")
    fun login(@RequestBody loginRequest: LoginRequest): ResponseEntity<Any> {
        val user = userService.login(loginRequest.username, loginRequest.password)
        return if (user != null) {
            val metrics = userService.getUserHealthMetrics(user.id)
            val safeUser = SafeUserDTO(
                id = user.id,
                username = user.username,
                healthMetrics = metrics
            )
            ResponseEntity.ok(mapOf("user" to safeUser))
        } else {
            ResponseEntity.status(401).body("Invalid credentials")
        }
    }

    @PostMapping("/register")
    fun register(@RequestBody payload: Map<String, Any>): ResponseEntity<String> {
        val newUser = User(
            username = payload["username"] as String,
            password = PasswordHasher.hash(payload["password"] as String),
        )
        userRepository.save(newUser)
        return ResponseEntity.ok("User registered successfully")
    }
}

data class LoginRequest(
    val username: String,
    val password: String
)

