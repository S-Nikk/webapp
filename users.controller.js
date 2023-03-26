import UsersDAO from "../dao/users.js"

export default class UsersCtrl {
    static async apiGetUsers (req, res, next)
    {
        const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage, 10): 20

        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}

        if (req.query.cuisine) {
        filters.cuisine = req.query.cuisine
        }else if (req.query.zipcode) {
        filters.zipcode = req.query.zipcode
        }else if (req.query.name) {
        filters.name = req.query.name
        }
        
        const { usersList, totalNumUsers } = await UsersDAO.getUsers({
            filters,
            page,
            usersPerPage,
        })
        let response = {
            users: usersList,
            page: page,
            filters: filters,
            entries_per_page:usersPerPage,
            total_results: totalNumUsers,
        }
        res.json(response)
    }
}

