import AdCard from "./AdCard";
import { useQuery, gql } from "@apollo/client";

const GET_ALL_ADS = gql`
  query GetAllAds {
    getAllAds {
      id
      title
      description
      owner
      price
      location
      createdAt
      pictures {
        id
        url
      }
    }
  }
`;

const RecentAds = () => {
  const { loading, error, data } = useQuery(GET_ALL_ADS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log("data", data);

  return (
    <>
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        {data.getAllAds.map((el: any) => {
          // console.log("el", el);
          return (
            <div key={el.id}>
              <AdCard
                id={el.id}
                title={el.title}
                picture={el.pictures[0]?.url}
                price={el.price}
                category={el.category}
              />
              <button onClick={() => {}}>Delete</button>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default RecentAds;
