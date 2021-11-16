<template>
    <div>
        <h2 class="text-center">This is dummy page</h2>
        <div class="not-found-image">
            <img src="../assets/images/404-share-image.png" alt="">
        </div>
    </div>
</template>

<style lang="scss" scoped>
.not-found-image{
    width: calc(100% - 40px);
    margin: 0 40px;
    img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
h2{
    color: #b8b8b8;
}
</style>