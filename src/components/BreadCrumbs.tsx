import "./BreadCrumbs.css";
import React from "react";
import { Link } from "react-router-dom";
import { FC } from "react";
import { ROUTES } from "../Routes";

interface Crumb {
  label: string;
  path?: string;
}

interface BreadCrumbsProps {
  crumbs: Crumb[];
}

export const BreadCrumbs: FC<BreadCrumbsProps> = (props) => {
  const { crumbs } = props;

  return (
    <ul className="breadcrumbs">
      <li>
        <Link to={ROUTES.HOME}>Главная</Link>
      </li>
      {!!crumbs.length &&
        crumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <li className="slash">/</li>
            {index === crumbs.length - 1 ? (
              <li>
                {/*<Link to={ROUTES.SPACEOBJECTS}>{crumb.label}</Link>*/}
                {crumb.label}
              </li>
            ) : (
              <li>
                <Link to={crumb.path || ""}>{crumb.label}</Link>
              </li>
            )}
          </React.Fragment>
        ))}
    </ul>
  );
};