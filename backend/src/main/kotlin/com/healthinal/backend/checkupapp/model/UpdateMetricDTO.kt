package com.healthinal.backend.checkupapp.model

import java.time.LocalDate

data class UpdateMetricDTO(
    val userId: String,
    val date: LocalDate,
    val title: String,
    val mainValue: Double?,
    val goal: Double?
)
