import React from "react";
import { useQuery } from '@apollo/client';
import { Card } from 'react-bootstrap';
import { QUERY_CHEAPEST_SUPPLIER } from '../utils/queries';
import ReOrderPoint from "./ReOrderPoint";

const CheapestSupplier = ({ materialId, materialStock }) => {
  const { 
    loading: cheapestSupplierLoading, 
    error: cheapestSupplierError, 
    data: cheapestSupplierData
  } = useQuery(
    QUERY_CHEAPEST_SUPPLIER, 
    {
      variables: {
        materialId: materialId
      } 
    }
  );

  if (cheapestSupplierLoading) {
    return 'Loading'
  }

  if (cheapestSupplierError) {
    return `Error: ${cheapestSupplierError.message}`
  }

  const { cheapestSupplier } = cheapestSupplierData;

  let cheapestSupplierContainer = '';

  if (!cheapestSupplier) {
    cheapestSupplierContainer = (
      <section>
        No supplier found for this material.<br />
        Please add this material to at least one supplier.
      </section>
    );
  } else {
    cheapestSupplierContainer = (
      <section>
        The supplier <strong>{cheapestSupplier.name}</strong> has the lowest cost for this material!
      </section>
    );
  }

  return (
    <>
      <Card >
        <Card.Body style={{ width: '20rem' }}>
          <div>
          {cheapestSupplierContainer}
          </div>
          <div>
            <ReOrderPoint supplierId={cheapestSupplier._id} materialId={materialId} materialStock={materialStock} />
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default CheapestSupplier;