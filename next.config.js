module.exports = {

  output: 'export',

  env: {

    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    IMAGE_COUNT: require('fs').readdirSync(require('path').join(process.cwd(), 'public', 'images')).length.toString()
  }
}
