require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

knexInstance.from('amazong_products')
    .select('*');

/*knexInstance.from('amazong_products').select('*')
    .then(results => {
        console.log(results)
    })*/

//  This searches in the group 'amazong_products' for any data with the name 'Point of view gun'. Then it grabs the information
//product_id, name, price and catagory and then returns that info to us in the form of an object. .first() will make it so it only returns
//the first value that fits these descriptions

/*knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .where({name: 'Point of view gun'})
    .first()
    .then(results => {
        console.log(results)
    })*/


/*const qry = knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .where({ name: 'Point of view gun' })
    .first()
    .toQuery()
    // .then(result => {
    //   console.log(result)
    // })
  
console.log(qry)*/

//  Uses a search term in the function. Then grabs the info (product_id, name ....) from the amazong_products folder. Looking for anything with a name
//similar to the search term (LIKE is case sensetive, ILIKE isnt), then returns the results

/*function searchByProduceName(searchTerm) {
    knexInstance
      .select('product_id', 'name', 'price', 'category')
      .from('amazong_products')
      .where('name', 'ILIKE', `%${searchTerm}%`)
      .then(result => {
        console.log(result)
      })
}
  
searchByProduceName('holo')*/

//  finds all the data that matches the description but only shows 10 at a time and allows you cycle though each set of 10 by changing the offset value

/*function paginateProducts(page) {
    const productsPerPage = 10;
    const offset = productsPerPage * (page - 1);
    knexInstance
        .select('product_id', 'name', 'price', 'category')
        .from('amazong_products')
        .limit(productsPerPage)
        .offset(offset)
        .then( result => {
            console.log(result)
        })
}

paginateProducts(2)*/

//  This allows us to search for all data with images. Cant search for null because all nulls are considered different. Instead we use .whereNotNull to see all
//data that does not have a value of null in there image value

/*function getProductsWithImages() {
    knexInstance
      .select('product_id', 'name', 'price', 'category', 'image')
      .from('amazong_products')
      .whereNotNull('image')
      .then(result => {
        console.log(result)
      })
}


getProductsWithImages()*/

//  The variable days is how many days ago you want to look back.
function mostPopularVideosForDays(days) {
    knexInstance
      .select('video_name', 'region')
      .count('date_viewed AS views')
      .where(
        'date_viewed',
        '>',
        knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
      )
      .from('whopipe_video_views')
      .groupBy('video_name', 'region')
      .orderBy([
        { column: 'region', order: 'ASC' },
        { column: 'views', order: 'DESC' },
      ])
      .then(result => {
        console.log(result)
      })
}

mostPopularVideosForDays(30)


console.log('knex and driver installed correctly');