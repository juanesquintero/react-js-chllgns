import React from "react";
import classNames from "classnames";

import "./ProposalRow.css";

const withoutEventDefault = (callback) =>
    event => {
        event.preventDefault();
        callback();
    };

const STATUSES = {
    ACCEPTED: "accepted",
    REJECTED: "rejected",
    TO_DECIDE: "to be decided"
}
const STATUSES_VALUES = Object.values(STATUSES);

const ProposalRow = ({ proposal, onStatusUpdate }) => {
    const { id, title, status, category, speaker } = proposal;
    const [accepted, rejected] = [status === STATUSES.ACCEPTED, status === STATUSES.REJECTED]
    return (
        <div data-testid={`proposal-id-${id}`} className={classNames("ProposalRow", {
            "ProposalRow--accepted": accepted,
            "ProposalRow--rejected": rejected,
        })}>
            <div className='ProposalsRow__status_indicator' />

            <div className="ProposalsRow__title">
                {title}
            </div>

            <div className="ProposalsRow__speaker" >
                {speaker}
            </div>

            <div className="ProposalsRow__category">
                category: {category}
            </div>
            <div className="ProposalsRow__status">
                status: {STATUSES_VALUES.includes(status) ? status : "(unknown)"}
            </div>

            <button disabled={accepted} className={
                !accepted ?
                    "ProposalsRow__accept_button" :
                    "ProposalsRow__accept_button_placeholder"
            }
                onClick={withoutEventDefault(() => onStatusUpdate(id, STATUSES.ACCEPTED))}
            >
                Accept
            </button>


            <button
                disabled={rejected}
                className={
                    !rejected ?
                        "ProposalsRow__reject_button"
                        : "ProposalsRow__reject_button_placeholder"
                }
                onClick={withoutEventDefault(() => onStatusUpdate(id, STATUSES.REJECTED))}
            >
                Reject
            </button>

        </div>
    );
};

export default ProposalRow;
