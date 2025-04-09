package com.healthinal.backend.checkupapp.controllers

import com.healthinal.backend.checkupapp.model.SafeUserDTO
import com.healthinal.backend.checkupapp.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class UserController(
    @Autowired private val userService: UserService
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
}

data class LoginRequest(
    val username: String,
    val password: String
)

