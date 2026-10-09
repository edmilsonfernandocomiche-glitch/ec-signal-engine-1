plugins { id("com.android.application") }

android {
    namespace = "com.ecsignalengine.app"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.ecsignalengine.app"
        minSdk = 23
        targetSdk = 35
        versionCode = 1
        versionName = "4.1.0"
    }
}

dependencies {
    implementation("androidx.webkit:webkit:1.12.1")
}
