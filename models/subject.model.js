const mongoose = require('mongoose');


const subjectSchema = new mongoose.Schema({
    // name - description - videos [{videoName,link,views: [] }] - exames []
    name: {
        type: String,
        unique: true,
        maxlength: 10,
        required: true
    },
    description: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    videos: [
        {
            videoName: {
                type: String,
            },
            link: {
                type: String
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
            subjectName: {
                type: String,
            }
        }
    ]
})



const subjectModel = mongoose.model('subject', subjectSchema)



module.exports = subjectModel