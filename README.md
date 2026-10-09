# EC Signal Engine V4.1 — Android project

This project packages the supplied Candle Auto HTML interface inside an Android WebView. It is read-only analysis; it does not execute trades.

## Build an APK
1. Install Android Studio on a computer and open this folder as a project.
2. Allow Gradle sync and install Android SDK Platform 35 if prompted.
3. Select **Build > Build APK(s)**.
4. The debug APK will be in `app/build/outputs/apk/debug/app-debug.apk`.

## Important
- The app needs internet access to reach the configured Cloudflare Worker.
- The Worker must be deployed and its OTCharts secret configured.
- The included HTML is the content of the ZIP uploaded as `EC_Signal_Engine_V4_1_CANDLE_AUTO.zip`. Its interface says **CARREGAR CANDLES** and **INICIAR AUTO**; it is not identical to the screenshot that showed **ANALISAR AGORA** and the “Poucas candles fechadas: 0” error.
- No APK is included yet because this environment does not have Android SDK/Gradle installed to compile and test it.
