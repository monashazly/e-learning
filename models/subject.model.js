const mongoose = require('mongoose');


const subjectSchema = new mongoose.Schema({
    // name - description - videos [{videoName,link,views: [] }] - exames []
    name: {
        type: String,
        unique: true,
        maxlength: 10,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
        trim: true,
    },
    videos: [
        {
            videoName: {
                type: String,
                trim: true
            },
            link: {
                type: String,
                trim: true
            },
            views: [
                {
                    userId: {
                        type: mongoose.Schema.Types.ObjectId,
                    }
                }
            ]
        }
    ],
    exames: [
        {
            exam: { type: String }
        }
    ]
}, { timestamps: true })



const subjectModel = mongoose.model('subject', subjectSchema)



module.exports = subjectModel