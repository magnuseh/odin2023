import { WireMock } from 'wiremock-captain';

const WIREMOCK_BASE_URL = process.env.WIREMOCK_BASE_URL || 'https://localhost:8443'
const wiremock = new WireMock(WIREMOCK_BASE_URL)

export default wiremock