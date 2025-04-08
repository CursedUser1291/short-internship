import com.ncorti.ktfmt.gradle.tasks.KtfmtFormatTask
import org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_21

plugins {
    alias(libs.plugins.detekt)
    alias(libs.plugins.ktfmt)
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.kotlin.plugin.spring)
    alias(libs.plugins.springframework.boot)
    alias(libs.plugins.version.catalog.update)
    alias(libs.plugins.versions)
    jacoco
}

group = "com.healthinal"

version = "0.0.1-SNAPSHOT"

java { toolchain { languageVersion = JavaLanguageVersion.of(21) } }

repositories { mavenCentral() }

dependencies {
    // enforce usage of spring boot dependency versions for all libraries
    api(enforcedPlatform(libs.spring.boot.dependencies))

    implementation(libs.spring.boot.starter.actuator)
    implementation(libs.spring.boot.starter.web)
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("io.jsonwebtoken:jjwt-api:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.11.5")
    implementation("org.springframework.boot:spring-boot-starter-security")
    runtimeOnly("com.mysql:mysql-connector-j")
    implementation(libs.jackson.module.kotlin)
    implementation(libs.kotlin.reflect)
    implementation(libs.apache.poi.ooxml)

    testImplementation(libs.spring.boot.starter.test)

    runtimeOnly(libs.postgresql)

    annotationProcessor(libs.spring.boot.configuration.processor)
}

kotlin {
    compilerOptions {
        freeCompilerArgs.addAll("-Xjsr305=strict")
        jvmTarget.set(JVM_21)
    }
}

tasks.withType<Test> { useJUnitPlatform() }

detekt {
    source.setFrom(listOf("src/main/kotlin", "src/test/kotlin"))
    config.setFrom(files("detekt.yml"))
    buildUponDefaultConfig = true
    parallel = true
}

ktfmt { kotlinLangStyle() }

tasks.register<KtfmtFormatTask>("ktfmtPrecommit") {
    val filesToLint: String? by project
    val filesToLintArray = filesToLint?.split("\n")?.filter { it.isNotEmpty() }
    source = project.fileTree(project.projectDir)
    if (filesToLintArray != null) {
        val array = filesToLintArray.toTypedArray()
        include(*array)
    } else {
        include("**/*.kt")
    }
}

tasks
    .matching { it.name == LifecycleBasePlugin.CHECK_TASK_NAME }
    .first()
    .apply {
        setDependsOn(dependsOn.filter { !(it is TaskProvider<*> && it.name == "detekt") })
        dependsOn("ktfmtCheck")
        dependsOn("detekt")
        // Run detektMain as well. See discussion https://github.com/detekt/detekt/issues/3122 and
        // https://github.com/detekt/detekt/discussions/4959
        dependsOn("detektMain")
    }
