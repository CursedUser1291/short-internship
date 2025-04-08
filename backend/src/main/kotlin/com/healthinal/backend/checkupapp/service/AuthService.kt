package com.healthinal.backend.checkupapp.service

import com.healthinal.backend.checkupapp.dto.AuthRequest
import com.healthinal.backend.checkupapp.dto.AuthResponse
import com.healthinal.backend.checkupapp.repository.UserRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtService: JwtService
) {

    fun login(request: AuthRequest): AuthResponse {
        val user = userRepository.findByUsername(request.username)
            ?: throw IllegalArgumentException("User not found")

        if (!passwordEncoder.matches(request.password, user.password)) {
            throw IllegalArgumentException("Invalid password")
        }

        val token = jwtService.generateToken(user.id)

        return AuthResponse(token = token)
    }
}
