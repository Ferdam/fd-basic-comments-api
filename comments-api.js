import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 5000;
const app = express();

function init(params) {    
    app.use(bodyParser.json({ type: '*/*' }));
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
        next();
    });
    app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
    });

    startEndpoints();
}

function startEndpoints(params) {
    GET_Comments_Endpoint();
    POST_Comments_Endpoint();
    DELETE_Comments_Endpoint();
}

function GET_Comments_Endpoint(params) {
    app.get("/comments", (req, res, next) => {
        let commentsData = JSON.parse(fs.readFileSync('./comments.json'));
        res.json(commentsData);
    });
}

function POST_Comments_Endpoint(params) {
    app.post('/comments', (req, res) => {
        try {
            console.log(req.body);
            let resObject = { error: { internalCode: 'Error_Server', message: 'Something went wrong. Try again later.' } };
            let newComment = req.body;
            if (newComment?.author && newComment?.comment) {
                let commentsFile = JSON.parse(fs.readFileSync('./comments.json'));
                newComment = {
                    id: commentsFile.lastIndex + 1,
                    author: newComment.author,
                    comment: newComment.comment,
                    date: new Date(Date.now()).toLocaleString('pt-br', {timeZone: 'UTC'})
                };
                commentsFile.lastIndex = newComment.id;
                commentsFile.data.push(newComment);
                fs.writeFileSync('./comments.json', JSON.stringify(commentsFile));
                resObject = commentsFile;
                res.send(commentsFile);
                return;
            }
            resObject = { error: { internalCode: 'Error_User_Input', message: 'Please do not leave any blank inputs.' } };
        }
        catch (error) {
            res.send(resObject);
        }
    });
}

function DELETE_Comments_Endpoint(params) {
    app.delete('/comments/:id', (req, res) => {
        let resObject = 'Error_Server;Something went wrong. Try again later.';
        try {
            let idToDelete = parseInt(req.params.id);
            console.log(idToDelete);
            if (!idToDelete) {
                resObject = null;
                throw new Error('Error_User_Input;Could not find specified comment.');
            }
            let commentsFile = JSON.parse(fs.readFileSync('./comments.json'));
            let commentToDelete = commentsFile.data.find(x => x.id === idToDelete);
            if (!commentToDelete) {
                resObject = null;
                throw new Error('Error_User_Input;Could not find specified comment.');
            }
            commentsFile.data.splice(commentsFile.data.indexOf(commentToDelete), 1);
            // commentsFile.lastIndex--;
            fs.writeFileSync('./comments.json', JSON.stringify(commentsFile));
            res.send(commentsFile);
        }
        catch (error) {
            console.log(error);
            if (!resObject) {
                let [internalCode,message] = error.message.split(';');
                res.send({error:{ internalCode, message }});
                return;
            }
            let [internalCode,message] = resObject.split(';');
            res.send({error:{ internalCode, message }});
        }
    })
}

function commentsServer(params) {
    init();
}

export default commentsServer;