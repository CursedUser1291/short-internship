package com.healthinal.backend.checkupapp.service

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.stereotype.Service
import java.util.*

@Service
class JwtService {

    private val secretKey = Keys.hmacShaKeyFor("ca99e797804ee9d3c0e6fe9d51499e54d42e70e4544c9faaad271310e45a12fd".toByteArray())

    fun generateToken(userId: String): String {
        return Jwts.builder()
            .setSubject(userId)
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24h
            .signWith(secretKey, SignatureAlgorithm.HS256)
            .compact()
    }
}
