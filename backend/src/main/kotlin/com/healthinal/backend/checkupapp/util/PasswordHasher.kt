package com.healthinal.backend.checkupapp.util

import java.security.MessageDigest
import java.util.Base64

object PasswordHasher {

    fun hash(password: String): String {
        val md = MessageDigest.getInstance("SHA-256")
        val hashedBytes = md.digest(password.toByteArray(Charsets.UTF_8))
        return Base64.getEncoder().encodeToString(hashedBytes)
    }

    fun matches(rawPassword: String, hashedPassword: String): Boolean {
        return hash(rawPassword) == hashedPassword
    }
}
