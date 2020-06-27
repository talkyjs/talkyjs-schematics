import { <%= classify(name) %>Service } from '../<%= classify(name) %>.service'

describe('<%= classify(name) %>Service', () => {
    let service: <%= classify(name) %>Service
    beforeEach(() => {
        service = new <%= classify(name) %>Service()
    })
    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})