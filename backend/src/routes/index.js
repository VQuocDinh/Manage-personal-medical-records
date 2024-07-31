import auth from './auth'
import patient from './patient'
import staff from './staff'
import account from './account'
import healthIndicators from './healthIndicator'
import medicalRecords from './medicalRecords'
import recordIndicators from './recordIndicators'


const initRoutes = (app) =>{
    app.use('/api/auth', auth)
    app.use('/api/patient', patient)
    app.use('/api/staff', staff)
    app.use('/api/account', account)
    app.use('/api/health-indicator', healthIndicators)
    app.use('/api/medical-records', medicalRecords)
    app.use('/api/record-indicators', recordIndicators)

    return app.use('/',(req,res) => {
        return res.send('SERVER ON')
    })
}

export default initRoutes