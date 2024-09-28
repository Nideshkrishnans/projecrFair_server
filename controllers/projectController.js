const projects = require('../model/projectmodel')


exports.addProjectController=async(req,res)=>{

    //console.log('inside addProjectController');
    const userId= req.payload
    //console.log(userId);
    //console.log(req.body);
    
    const {title , language, github, website, overview } =req.body
    //console.log(title , language, github, website, overview);

    const projectImg = req.file.filename
    //console.log(projectImg);
    
    try {
        const existingproject = await projects.findOne({github})
        if (existingproject){
            res.status(406).json('project already exist')
        }
        else{
            const newProject = new projects({
                title, 
                language,
                github,
                website,
                overview,
                projectImg,
                userId

            })
            await newProject.save()
            res.status(200).json(newProject)
        }
        
    } catch (error) {
        res.status(401).json(error)
    }
        
    }
    
//get all projects
exports.getAllProjectController = async(req,res)=>{
    //body = req.body
    //path = req.param
    //query = req.query

    const searchKey = req.query.search
    //console.log(searchKey);
    
    const query ={
        language:{
            $regex:searchKey,$options:'i'
        }
    }

    try {
        const allProject = await projects.find(query)
        res.status(200).json(allProject)
        
    } catch (error) {
        res.status(401).json(error)
    }
}    


//get home projects

exports.getHomeProjectController = async(req,res)=>{
    try {
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject)

        
    } catch (error) {
        res.status(401).json(error)
 
    }
}

//get userproject

exports.getUserProjectController = async (req,res)=>{
    const userId = req.payload

    try {
        const userProject = await projects.find({userId})
        res.status(200).json(userProject)
    } catch (error) {
        res.status(401).json(error)
    }
}


//delete userproject
exports.deleteUserProjectController=async(req,res)=>{
      const {id} = req.params
    try {
        const item = await projects.findByIdAndDelete({_id:id})
        res.status(200).json('project deleted')
        
    } catch (error) {
        res.status(401).json(error)
    }
}


//edit project controller
exports.editUserProjectController=async(req,res)=>{
    const {title , language, github, website, overview, projectImg } =req.body

    const projectimage = req.file?req.file.filename:projectImg
    console.log(projectImg);
    
    
    const {id} = req.params
    console.log(id);
    const userId= req.payload

    try {
        const existingproject= await projects.findByIdAndUpdate({_id:id},{
            title,
            language,
            github,
            website,
            overview,
            projectImg:projectimage,
            userId
        },{new:true})
        await existingproject.save()
        res.status(200).json(existingproject)
        
    } catch (error) {
        res.status(401).json(error)
    }
    
}