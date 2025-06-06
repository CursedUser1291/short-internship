package com.healthinal.backend.checkupapp.repository

import com.healthinal.backend.checkupapp.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<User, String> {
    fun findByUsername(username: String): User?
}
