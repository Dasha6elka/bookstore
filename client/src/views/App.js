/** @jsx jsx */

import Register from "containers/auth/register";
import { CssBaseline } from "@material-ui/core";
import { css, Global, jsx } from "@emotion/core";
import { Router } from "@reach/router";
import Login from "containers/auth/login";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Dashboard from "containers/dashboard";
import PrivateRoute from "components/PrivateRoute";

export default function App(props) {
    const { logged } = props;

    return (
        <CssBaseline>
            <Global
                styles={css`
                    html,
                    body,
                    #root,
                    div[role="group"] {
                        width: 100%;
                        height: 100%;
                    }
                `}
            />
            <Container
                css={css`
                    height: calc(100% - 64px);
                    max-width: 100%;
                    padding: 0;
                `}
            >
                <Router>
                    <Login path="login" />
                    <Register path="register" />
                    <PrivateRoute
                        authorized={logged}
                        path="*"
                        render={props => <Dashboard {...props} />}
                    />
                </Router>
            </Container>
        </CssBaseline>
    );
}

App.propTypes = {
    logged: PropTypes.bool,
};
