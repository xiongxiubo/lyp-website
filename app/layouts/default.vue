<template>
  <div>
    <a class="skip-link" href="#main-content">跳转到正文</a>
    <SiteHeader />
    <main id="main-content" tabindex="-1"><slot /></main>
    <SiteFooter />
  </div>
</template>
