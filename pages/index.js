
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function Home({ data }) {

  return (

    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#d3d3d3' }}>

      <div style={{ margin: 'auto', width: '50%', paddingTop: '30px', paddingBottom: '30px', textAlign: 'center', color: '#292929', fontSize: '35px' }}>GraphQL Jobs</div>

      <List style={{ margin: 'auto', width: '50%', height: '80%', overflow: 'auto' }}>

        {data.jobs.map((job, index) => {
          return (

            <ListItem disablePadding key={index} style={{ paddingBottom: '5px', marginTop: '2px' }}>
              <ListItemButton style={{ border: '2px solid #292929', borderRadius: '10px', padding: '0px', paddingLeft: '10px' }}>
                <ListItemText primary={job.title} secondary={job.company.name + ' - ' + (job.locationNames == null ? 'Remote' : job.locationNames)} />
              </ListItemButton>
            </ListItem>

          )
        })}

      </List>

    </div>

  )

}

export async function getServerSideProps(context) {

  let results = await fetch('https://api.graphql.jobs/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `{
        jobs {
          title
          company{
            name
          }
          locationNames
        }
      }`
    })
  })

  let res = await results.json();
  return { props: res }

}