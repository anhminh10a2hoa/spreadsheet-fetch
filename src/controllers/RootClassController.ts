const ENDPOINT = import.meta.env.VITE_BACKEND_END_POINT;
const PROJECTERP_NAME = import.meta.env.VITE_PROJECTERP_NAME;
const EKSELI_OFFER_NAME = import.meta.env.VITE_EKSELI_OFFER_NAME;
const PROJECTERP_DATA = import.meta.env.VITE_PROJECTERP_DATA;

export async function saveSheetData(store:string,sheetUrl:string, cell:string,  data:any,updateMode:boolean):Promise<any>{
  if(updateMode){
    //if sheet is missing http://www.ekseli.fi/ prefix add base
    sheetUrl = sheetUrl.substr(0,4)!=="http"?sheetUrl="http://www.ekseli.fi/"+sheetUrl:sheetUrl
    if(sheetUrl!==undefined&&data!==undefined){     
      //don't loop the data
      //for (var key in data) {
        let delete_insert_query = "DELETE {?s ?p ?o} WHERE {?s ?p ?o. "+
                            " FILTER (?s=<"+sheetUrl+"> && (?p=<"+ cell+">))}"+//||<http://www.ekseli.fi/EPOC>
                            " insert {<"+sheetUrl+"><"+cell+"> '" + data + "'.}" 
                            //"<"+sheetUrl+"><http://www.ekseli.fi/EPOC>" + Date.now()+"}";  
        //alert(delete_insert_query);
        fetch(createSparqlUrl(store, delete_insert_query),
          {
            method:"POST"
          }
        )
        .then((response)=>response.json())
        .then(jsonData=>{
          console.log("Updated " +sheetUrl+ " data");
        })
        .catch(exception=>{
          alert("saveSheetData: "+exception);
        });
      //}
    }
    else{
      alert("Cannot save undefined sheet")
    }
  }
}

/** Sometimes the query is used with graph=end point and mosttly with a specific aned point */
function createSparqlUrl (graph: string, query: string) {
  if (graph === '') {
    return ENDPOINT
      // '?query=' + encodeURIComponent(query) +
      + '?query=' + query
      + '&should-sponge=&format=json&timeout=2000';
  }
  else {
    return ENDPOINT
      + '?query=' + encodeURIComponent(query)
      + '&format=json'
      + '&default-graph-uri=' + encodeURIComponent(graph);
  }
}