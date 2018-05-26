// @flow

import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const Variables = () => (
  <Query
    query={gql`
      {
        variables {
          code
          label
          description
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.variables.map(({ code, label, description }) => (
        <p key={code} title={`${description}`}>
          {`${label}`}
        </p>
      ));
    }}
  </Query>
);

export default Variables;
