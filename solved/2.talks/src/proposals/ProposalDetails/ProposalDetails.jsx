import React from "react";

import DetailsSection from "../DetailsSection";

import "./ProposalDetails.css";

const ProposalDetails = ({ talk }) => {
    const { speaker, category, description } = talk;
    console.table({ speaker, category, description });
    return (
        <div data-testid="proposal-details" className="ProposalDetails">
            <DetailsSection
                className="ProposalDetails__speaker"
                name="speaker"
            >
                <span className="ProposalDetails__speaker__value">
                    {speaker}
                </span>
            </DetailsSection>
            <DetailsSection
                className="ProposalDetails__category"
                name="category"
            >
                {category}
            </DetailsSection>
            <DetailsSection
                className="ProposalDetails__description"
                name="description"
            >
                <div className="ProposalDetails__description__value">
                    {description}
                </div>
            </DetailsSection>
        </div>
    );
};

export default ProposalDetails;
