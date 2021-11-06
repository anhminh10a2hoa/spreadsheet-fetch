import { IToastObject } from "@types";

export const ENDPOINT = import.meta.env.VITE_BACKEND_END_POINT;
export const PROJECTERP_NAME = import.meta.env.VITE_PROJECTERP_NAME;
export const EKSELI_OFFER_NAME = import.meta.env.VITE_EKSELI_OFFER_NAME;
export const PROJECTERP_DATA = import.meta.env.VITE_PROJECTERP_DATA;
export const PROJECTERP_DATA_01 = import.meta.env.VITE_PROJECTERP_DATA_01;

export async function saveSheetData(store:string,sheetUrl:string, cell:string,  data:any, updateMode:boolean):Promise<IToastObject>{
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
        // alert(delete_insert_query);
        return await fetch(createSparqlUrl(store, delete_insert_query),
          {
            method:"POST"
          }
        )
        .then((response)=> {
          if (!response.ok) {
            return {'type': 'error', 'message': 'Something went wrong', 'open': true};
          } 
          return {'type': 'success', 'message': "Updated " +sheetUrl+ " data", 'open': true}
        })
      //}
    }
    else{
      return {'type': 'error', 'message': 'Something went wrong', 'open': true};
    }
  } else {
    return {'type': 'error', 'message': 'Something went wrong', 'open': true};
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