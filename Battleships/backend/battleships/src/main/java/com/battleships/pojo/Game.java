package com.battleships.pojo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class Game {

    public static final Map<String, User> users = new HashMap<>();
    public static final Map<String, User> tempUsersInQueue = new HashMap<>();
    public static final List<User> usersInQueue = new ArrayList<>();
    public static final Map<String, GameState> boardStates = new HashMap<>();
    public static final Lock lock = new ReentrantLock();

}
