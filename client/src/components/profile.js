import {useEffect, useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {UserContext} from '../lib/UserContext';
import Loading from './loading';
import {Grid, Paper, Typography} from "@material-ui/core";
import {contract} from "../lib/magic";

const User = (props) => {
    const [amt, setAmt] = useState(0);
    const [inc, setInc] = useState(0);

    useEffect(() => {
        let users = async function () {

            // if (contract && user && !user.loading) {
            //     console.log(user.publicAddress);


            // let userAddresses = await contract.methods.get().call({from: user.publicAddress});
            // console.log('addresses', userAddresses);
            // // setUsers()
            if (props.addr !== '0x0000000000000000000000000000000000000000' && props.addr) {
                console.log(props.addr);
                let invested = await contract.methods.getStakingAmount(props.addr).call({from: props.publicAddress});
                console.log(props.addr, ":", invested);
                setAmt(invested);

                // let win = await contract.methods.getWinningsAmount(props.addr).call({from: props.publicAddress});
                // console.log(props.addr, ":", win);
                // setInc(win);
            }
            // }
        }

        users();
    });

    return (<Grid item xs={12}>
        {props.addr !== '0x0000000000000000000000000000000000000000' ?
            <Paper variant={"outlined"} style={{padding: 10}}>
                <Typography variant={"body1"} color={"textSecondary"}>{props.addr}: {amt} Cake
                    {/*(+{inc} Cake)*/}
                </Typography>
            </Paper> : ""}
    </Grid>);
}
const Profile = () => {
    const history = useHistory();
    const [user] = useContext(UserContext);
    const [users, setUsers] = useState(['0x6CC8b5A7f6b41229e35A2163F79c55436c9efE07']);
    // Redirect to login page if not loading and no user found
    useEffect(() => {

        let users = async function () {

            if (contract && user && !user.loading) {
                console.log(user.publicAddress);


                let userAddresses = await contract.methods.getStakingUsers().call({from: user.publicAddress});
                console.log('addresses', userAddresses);

                setUsers(userAddresses);

                // let invested = await contract.methods.getStakingAmount(user.publicAddress).call({from: user.publicAddress});
                // console.log('my state', invested);
                // setMyStake(invested);
            }
        }

        user && !user.loading && users();

        user && !user.loading && !user.issuer && history.push('/login');

    }, [user, history]);

    return (
        <>
            {user?.loading ? (
                <Loading/>
            ) : (
                user?.issuer && (
                    <>
                        <p>Email: {user.email}</p>
                        <p>User Id: {user.issuer}</p>
                        <p>BNB Public Address: {user.publicAddress}</p>

                        <Grid container spacing={1} style={{margin: "20px 0"}}>
                            {users.map(addr => <User addr={addr} user={user}/>)}
                            {/*<Grid item xs>*/}
                            {/*    <Paper variant={"outlined"} style={{padding: 10}}>*/}
                            {/*        Peoaple*/}
                            {/*    </Paper>*/}
                            {/*</Grid>*/}
                        </Grid>

                    </>
                )
            )}
        </>
    );
};

export default Profile;
