# docker-mocha
build prod image:
`docker build -t calculator --build-arg VERSION=$MY_COMPONENT_VERSION -f Dockerfle.production .`

build test image (wrapper around prod image):
`docker build -t calculator-test -f Dockerfile.test .`